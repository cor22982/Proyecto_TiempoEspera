from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    host = "https://deimoss.web05.lol"
    wait_time = between(1, 5)
    @task
    def logearse(self):
        self.client.post("/login", {
            "pi": "3620515420101",
            "password": "4d186321c1a7f0f354b297e8914ab240",
            "rol": "usuario_comun"
        })
    
    @task
    def buscar_tramite(self):
        self.client.get("/institutions/cita")
