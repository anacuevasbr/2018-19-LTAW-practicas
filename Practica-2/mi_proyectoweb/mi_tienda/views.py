from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template
from django.shortcuts import render
from mi_tienda.models import Product


def mi_funcion(request):
    html = "Rafa es tonto"

    return HttpResponse(html)



def mi_producto(request, param):

    num = int(param)
    products = Product.objects.all()
    print(products[0])

    t = get_template('product.html')
    #c = products[num-1]
    c= {}
    html = t.render(c)

    return HttpResponse(html)

def index_func(request):
    #fp = open('/home/alumnos/acuevas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/product.html')


    return render(request, "index.html", {})
