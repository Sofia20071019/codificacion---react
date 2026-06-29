from flask import request, jsonify

class PagoController:

    @staticmethod
    def listar_pagos():
        try:
            from app.services.pago_service import PagoService
            pagos = PagoService.listar_todos()
            data = []
            for p in pagos:
                data.append({
                    "idPago": p.idPago,
                    "idJornada": p.idJornada,
                    "idUsuario_Admin": p.idUsuario_Admin,
                    "montoPagado": float(p.montoPagado) if p.montoPagado else None,
                    "idMetodo": p.idMetodo,
                    "nombreMetodo": p.metodo.nombreMetodo if p.metodo else None,
                    "fechaPago": str(p.fechaPago) if p.fechaPago else None
                })
            return jsonify({"status": "success", "data": data}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def crear_pago():
        data = request.get_json()
        try:
            from app.services.pago_service import PagoService
            pago = PagoService.crear_pago(
                idJornada=data.get("idJornada"),
                idUsuario_Admin=data.get("idUsuario_Admin"),
                montoPagado=data.get("montoPagado"),
                idMetodo=data.get("idMetodo"),
                fechaPago=data.get("fechaPago")
            )
            return jsonify({
                "status": "success",
                "data": {"idPago": pago.idPago}
            }), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400

    @staticmethod
    def aprobar_pago(idPago):
        data = request.get_json()
        try:
            from app.services.pago_service import PagoService
            pago = PagoService.aprobar_pago(idPago, **data)
            if not pago:
                return jsonify({"status": "error", "message": "Pago no encontrado"}), 404
            return jsonify({"status": "success", "message": "Pago actualizado"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
