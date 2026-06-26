from flask import request, jsonify

class RolController:

    @staticmethod
    def listar_roles():
        try:
            from app.services.rol_service import RolService
            
            # Buscamos todos los roles a través de nuestro servicio
            roles = RolService.obtener_todos()
            
            # Mapeamos los objetos de la BD a un diccionario/JSON simple
            roles_json = [{"id": r.id, "nombre": r.nombre} for r in roles]

            return jsonify({
                "status": "success",
                "data": roles_json
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def crear_rol():
        data = request.get_json()
        nombre = data.get("nombre")

        try:
            from app.services.rol_service import RolService
            
            nuevo_rol = RolService.crear_rol(nombre=nombre)

            return jsonify({
                "status": "success",
                "message": f"Rol '{nuevo_rol.nombre}' creado con éxito",
                "data": {
                    "id": nuevo_rol.id,
                    "nombre": nuevo_rol.nombre
                }
            }), 201

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400