package application

import (
	"encoding/json"
	"fmt"
	"net/http"
	"runtime"
)

func (m *MessageProcessor) dialogErrorCallback(window Window, message string, dialogID *string, err error) {
	errorMsg := fmt.Sprintf(message, err)
	m.Error(errorMsg)
	window.DialogError(*dialogID, errorMsg)
}

func (m *MessageProcessor) dialogCallback(window Window, dialogID *string, result string, isJSON bool) {
	window.DialogResponse(*dialogID, result)
}

func (m *MessageProcessor) processDialogMethod(method string, rw http.ResponseWriter, r *http.Request, window Window, params QueryParams) {

	args, err := params.Args()
	if err != nil {
		m.httpError(rw, "Unable to parse arguments: %s", err)
		return
	}
	dialogID := args.String("dialog-id")
	if dialogID == nil {
		m.Error("dialog-id is required")
		return
	}
	switch method {
	case "Info", "Warning", "Error", "Question":
		var options MessageDialogOptions
		err := params.ToStruct(&options)
		if err != nil {
			m.dialogErrorCallback(window, "Error parsing dialog options: %s", dialogID, err)
			return
		}
		if len(options.Buttons) == 0 {
			switch runtime.GOOS {
			case "darwin":
				options.Buttons = []*Button{{Label: "OK", IsDefault: true}}
			}
		}
		var dialog *MessageDialog
		switch method {
		case "Info":
			dialog = InfoDialog()
		case "Warning":
			dialog = WarningDialog()
		case "Error":
			dialog = ErrorDialog()
		case "Question":
			dialog = QuestionDialog()
		}
		var detached = args.Bool("Detached")
		if detached == nil || !*detached {
			dialog.AttachToWindow(window)
		}

		dialog.SetTitle(options.Title)
		dialog.SetMessage(options.Message)
		for _, button := range options.Buttons {
			label := button.Label
			button.OnClick(func() {
				m.dialogCallback(window, dialogID, label, false)
			})
		}
		dialog.AddButtons(options.Buttons)
		dialog.Show()
		m.ok(rw)
		m.Info("Runtime:", "method", "Dialog."+method, "options", options)

	case "OpenFile":
		var options OpenFileDialogOptions
		err := params.ToStruct(&options)
		if err != nil {
			m.httpError(rw, "Error parsing dialog options: %s", err.Error())
			return
		}
		var detached = args.Bool("Detached")
		if detached == nil || !*detached {
			options.Window = window
		}
		dialog := OpenFileDialogWithOptions(&options)

		go func() {
			if options.AllowsMultipleSelection {
				files, err := dialog.PromptForMultipleSelection()
				if err != nil {
					m.dialogErrorCallback(window, "Error getting selection: %s", dialogID, err)
					return
				} else {
					result, err := json.Marshal(files)
					if err != nil {
						m.dialogErrorCallback(window, "Error marshalling files: %s", dialogID, err)
						return
					}
					m.dialogCallback(window, dialogID, string(result), true)
					m.Info("Runtime:", "method", "Dialog."+method, "result", result)
				}
			} else {
				file, err := dialog.PromptForSingleSelection()
				if err != nil {
					m.dialogErrorCallback(window, "Error getting selection: %s", dialogID, err)
					return
				}
				m.dialogCallback(window, dialogID, file, false)
				m.Info("Runtime:", "method", "Dialog."+method, "result", file)
			}
		}()
		m.ok(rw)
		m.Info("Runtime:", "method", "Dialog."+method, "options", options)

	case "SaveFile":
		var options SaveFileDialogOptions
		err := params.ToStruct(&options)
		if err != nil {
			m.httpError(rw, "Error parsing dialog options: %s", err.Error())
			return
		}
		var detached = args.Bool("Detached")
		if detached == nil || !*detached {
			options.Window = window
		}
		dialog := SaveFileDialogWithOptions(&options)

		go func() {
			file, err := dialog.PromptForSingleSelection()
			if err != nil {
				m.dialogErrorCallback(window, "Error getting selection: %s", dialogID, err)
				return
			}
			m.dialogCallback(window, dialogID, file, false)
			m.Info("Runtime:", "method", "Dialog."+method, "result", file)
		}()
		m.ok(rw)
		m.Info("Runtime:", "method", "Dialog."+method, "options", options)

	default:
		m.httpError(rw, "Unknown dialog method: %s", method)
	}

}
