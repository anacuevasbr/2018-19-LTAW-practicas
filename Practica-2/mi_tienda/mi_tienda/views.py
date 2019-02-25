from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template


def mi_funcion(request):
    html = "Rafa es tonto"

    return HttpResponse(html)



def mi_producto(request, param):

    num = int(param)

    if num == 1:
        t = get_template('product.html')

        c = {'name': 'Lisas boots',
             'imagen':"https://pm1.narvii.com/6506/1ef0fee244e70761691360e40e20db53077d9a51_hq.jpg",
             'descrip':'Lisas ugly boots in as if its your last',
             'price': 'more than you can afford'}

        html = t.render(c)

    elif num == 2:
        t = get_template('product.html')

        c = {"name":"hobimask",
             "img" : "https://i.pinimg.com/originals/e0/02/e0/e002e09a803be717ca45cec9626e8007.jpg",
             "descrip": "In case you don't feel like breading ",
             "price": "no price"}

        html = t.render(c)
    else:
        print('error')
    
    return HttpResponse(html)

def index_func(request):
    #fp = open('/home/alumnos/acuevas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/product.html')
    t = get_template('index.html')

    c = {'name': 'Lisas boots', 'imagen':"https://pm1.narvii.com/6506/1ef0fee244e70761691360e40e20db53077d9a51_hq.jpg",
                'descrip':'Lisas ugly boots in as if its your last', 'price': 'more than you can afford'}

    html = t.render(c)

    return HttpResponse(html)
