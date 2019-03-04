from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
import json


def mi_funcion(request):
    html = "Rafa es tonto"

    return HttpResponse(html)



def mi_producto(request, param):

    num = int(param)
    json_data = open('/home/alumnos/acuevas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/inventory.json')
    data = json.load(json_data)

    t = get_template('product.html')
    c = data[num-1]
    html = t.render(c)

    return HttpResponse(html)

def index_func(request):
    #fp = open('/home/alumnos/acuevas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/product.html')
    t = get_template('index.html')

    c = {'name': 'Lisas boots', 'imagen':"https://pm1.narvii.com/6506/1ef0fee244e70761691360e40e20db53077d9a51_hq.jpg",
                'descrip':'Lisas ugly boots in as if its your last', 'price': 'more than you can afford'}

    html = t.render(c)

    return HttpResponse(html)
