package application

import (
	"net/http"
)

type ContextMenuData struct {
	Id   string `json:"id"`
	X    int    `json:"x"`
	Y    int    `json:"y"`
	Data any    `json:"data"`
}

func (m *MessageProcessor) processContextMenuMethod(method string, rw http.ResponseWriter, _ *http.Request, window Window, params QueryParams) {

	switch method {
	case "OpenContextMenu":
		var data ContextMenuData
		err := params.ToStruct(&data)
		if err != nil {
			m.httpError(rw, "error parsing contextmenu message: %s", err.Error())
			return
		}
		window.OpenContextMenu(&data)
		m.ok(rw)
	default:
		m.httpError(rw, "Unknown contextmenu method: %s", method)
	}

	m.Info("Runtime:", "method", "ContextMenu."+method)

}
