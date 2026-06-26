from flask import request, jsonify

class UsuarioController:
    
    @staticmethod
    def registrar_usuario():
        # 1. Obtener el cuerpo de la petición en formato JSON desde React
        data = request.get_json()

        # 2. Extraer los datos enviados por el frontend
        nombre = data.get("nombre")
        apellido = data.get("apellido")
        edad = data.get("edad")
        email = data.get("email")
        celular = data.get("celular")
        password = data.get("password")
        rol_id = data.get("rol_id")

        try:
            # 3. Delegar la lógica de negocio a la capa de servicios 
            # (Aquí es donde se encriptará la contraseña y se guardará en la BD)
            from app.services.usuario_service import UsuarioService
            
            nuevo_usuario = UsuarioService.crear_usuario(
                nombre=nombre,
                apellido=apellido,
                edad=edad,
                email=email,
                celular=celular,
                password=password,
                rol_id=rol_id
            )

            # 4. Responder exitosamente al frontend
            return jsonify({
                "status": "success",
                "message": "Usuario registrado exitosamente",
                "data": {
                    "id": nuevo_usuario.id,
                    "email": nuevo_usuario.email
                }
            }), 201

        except Exception as e:
            # En caso de que falle (ej. email duplicado) devolvemos el error
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400