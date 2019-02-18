from django.http import HttpResponse
from django.template import Template, Context

def mi_funcion(request):
    html = "Rafa es tonto"

    return HttpResponse(html)



def mi_producto(request):
    fp = open('/home/alumnos/acuevas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/product.html')
    t = Template(fp.read())
    fp.close
    c = Context({'name': 'Lisas boots'}, {'imagen':"https://pm1.narvii.com/6506/1ef0fee244e70761691360e40e20db53077d9a51_hq.jpg"},
                {'descrip':'Lisas ugly boots in as if its your last'}, {'price': 'more than you can afford'})

    html = t.render(c)

    return HttpResponse(html)
