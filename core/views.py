from django.shortcuts import render

# ============================================================
# Catálogo de servicios (precios en CLP) — fuente única de verdad.
# Editar aquí actualiza la página de Servicios y el select de Reserva.
# 'archivo' es la imagen real en core/static/img/.
# 'tipo': "plana" entra en la tarifa plana por modalidad (solo mano de obra);
#         "repuesto" suma el costo del componente (a cotizar).
# ============================================================
SERVICIOS = [
    {"nombre": "Limpieza",                  "tipo": "plana",    "archivo": "img/serv-limpieza.jpg"},
    {"nombre": "Mejora de Memoria RAM",     "tipo": "repuesto", "archivo": "img/serv-ram.jpg"},
    {"nombre": "Instalación de SSD",        "tipo": "repuesto", "archivo": "img/serv-ssd.jpg"},
    {"nombre": "Instalación de Windows",    "tipo": "plana",    "archivo": "img/serv-windows.jpg"},
    {"nombre": "Diagnóstico de Fallas",     "tipo": "plana",    "archivo": "img/serv-diagnostico.jpg"},
    {"nombre": "Reparación de Notebook",    "tipo": "repuesto", "archivo": "img/serv-notebook.jpg"},
    {"nombre": "Instalación de GPU",        "tipo": "repuesto", "archivo": "img/serv-gpu.jpg"},
    {"nombre": "Cambio de Fuente de Poder", "tipo": "repuesto", "archivo": "img/serv-fuente.jpg"},
    {"nombre": "Cambio de Placa Madre",     "tipo": "repuesto", "archivo": "img/serv-placa.jpg"},
    {"nombre": "Eliminación de Virus",      "tipo": "plana",    "archivo": "img/serv-virus.jpg"},
    {"nombre": "Mantención Preventiva",     "tipo": "plana",    "archivo": "img/serv-mantencion.jpg"},
    {"nombre": "Reparación de Pantalla",    "tipo": "repuesto", "archivo": "img/serv-pantalla.jpg"},
]

# ============================================================
# Tarifas — Servicio Técnico: PLANO por modalidad (no por hora).
# Precios en UF. 'directo' = efectivo/transferencia, 'boleta' = con
# documento tributario (SII).
# ============================================================
SERVICIO_TECNICO = [
    {"modalidad": "En Taller",            "extra": "Tú lo traes",                      "desc": "La opción más económica. El equipo se entrega listo en 24 h.", "directo": "1.0", "boleta": "1.3"},
    {"modalidad": "Con Retiro y Entrega", "extra": "Vamos por él",                     "desc": "Pasamos a buscar el equipo a tu domicilio y lo entregamos listo.", "directo": "1.3", "boleta": "1.6"},
    {"modalidad": "A Domicilio",          "extra": "In situ",                          "desc": "Trabajo realizado directamente en tu hogar u oficina.", "directo": "1.8", "boleta": "2.2"},
    {"modalidad": "A Domicilio Emergencia", "extra": "Nocturno / festivos",            "desc": "Post 20:00 hrs, domingos y festivos.", "directo": "3.0", "boleta": "3.6"},
]

# Soporte Tecnológico Básico: POR HORA.
SOPORTE = [
    {"modalidad": "A Terreno",  "extra": "Horario hábil",                  "directo": "1.0", "boleta": "1.2"},
    {"modalidad": "A Terreno",  "extra": "Post 20:00, domingos y festivos", "directo": "2.0", "boleta": "2.4"},
    {"modalidad": "Remoto",     "extra": "Horario hábil",                  "directo": "0.5", "boleta": "0.6"},
    {"modalidad": "Remoto",     "extra": "Post 20:00, domingos y festivos", "directo": "1.0", "boleta": "1.2"},
]


def home(request):
    return render(request, 'core/home.html', {'active': 'inicio'})


def servicios(request):
    return render(request, 'core/servicios.html', {
        'active': 'servicios',
        'servicios': SERVICIOS,
        'servicio_tecnico': SERVICIO_TECNICO,
        'soporte': SOPORTE,
    })


def contacto(request):
    return render(request, 'core/contacto.html', {
        'active': 'contacto',
        'servicios': SERVICIOS,
        'servicio_tecnico': SERVICIO_TECNICO,
    })
