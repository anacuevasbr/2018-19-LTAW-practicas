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
    print('traza')
    print(str(products[2].name))
    print('traza')
    t = get_template('product.html')
    c = {'name': products[num].name, 'imagen': products[num].image,
         'descrip': products[num].description, 'price': products[num].price}
    html = t.render(c)
    return HttpResponse(html)

def index_func(request):
    #fp = open('/home/alumnos/acuevas/2018-19-LTAW-practicas/Practica-2/mi_tienda/mi_tienda/product.html')
    products = Product.objects.all()
    #c = {'name': product.name, 'imagen': product.image}

    return render(request, "index.html")
