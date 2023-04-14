# Proyecto Rosbaco Landings

El FrontEnd consumirá un servicio del backend que le traerá la información necesaria para popular la web.
Dada una URL del estilo: https://www.rosbacopartners.com/landings/AAABBCCCDDD123, se tomará este valor "AAABBCCCDDD123" para llamar al servicio que traerá los datos para dibujar la landing correspondiente.

El contenido de la misma es modularizado en los siguientes módulos, con su detalle corespondiente:

## Modulos
1. <b>Menu:</b>
   En el mismo tendremos: logo del proyecto, items del menú, anclas definidas para cada item, dark o light en su color.
2. <b>Imágen:</b>
   Para imágen tendremos: url de la imagen a mostrar, posibilidad de que se encuentre con un Título, Subtítulo y Descripción sobre la misma, ancla definida.
3. <b>Video:</b>
   Para video tendremos: url del video a mostrar, ancla definida.
4. <b>Mapa Unidad:</b>
   Este mapa corresponde al componente más interactivo de la Web. El mismo tendrá varios atributos: Título, Subtítulo, Descripción, Imagen de Portada, Imágenes de      sombras para realizar mouse_over y mostrar los atributos y fotos de cada Unidad Funcional.
5. <b>Slider:</b>
   En el módulo Slider nos encontramos con un listado de imágenes, que tendrán orden y los mismos datos que el módulo Imagen.
6. <b>Texto:</b>
   Este módulo contará con Título, Subtítulo, Descripción y si será dark o light.
7. <b>Texto Imagen:</b>
   Este es un módulo partido, donde de un lado habrá texto y del otro una imagen. Para esto definimos un campo align donde el texto irá del lado derecho (right) o      izquierda (left) según corresponda. Los atributos serán los mismos que se vieron para Texto e Imagen.
8. <b>Texto Slider:</b>
   Este módulo, al igual que el anterior, se divide en dos. En este caso será Texto y Slider, con los atributos de cada uno de ellos.
9. <b>Mapa Ubicacion:</b>
   El módulo que detalla la ubicación del edificio será un compoente que tiene una imagen de un lado (left o right) y un detalle a mostrar del lado opuesto. Este      detalle tendrá un item, una descripción y estará englobado por un tipo (Restaurantes, Colegios, Gym, Supermercado, etc).
10. <b>Formulario:</b>
   El formulario siempre será igual en cuanto a funcionalidad y campos, solo se pasara color a mostrar (dark o light) y alineación de los campos dado que se dvide      la grilla en dos secciones.
11. <b>Footer:</b>
   Por último tenemos al footer, que tendrá el color para el fade sobre la imagen que se pondrá de fondo (url).
   
   
## Estructura de Datos
Se devolverá un solo JSON que tendrá todos los datos necesarios para dibujar la Web correspondiente. El mismo tendrá el siguiente formato.


```

"proyecto" : {
    "nombre" : "9 de Julio",
    "url" : "www.google.com",
    "logo" : "url_del_logo",
    "activo" : true/false,
    "GA":"Tag Analytics",
    "modulos" : {
        "menu" : [
            { "titulo" : "Home", "ancla" : "#home", ... },
            {"titulo" : "Contactenos", "ancla" : "#contact", ... },
            ...
        ],
        "imagen" : {
            "url" : "url_imagen",
            "titulo" : "titulo",
            "subtitulo : "subtitulo",
            "descripcion" : "lorem ipsum",
            "ancla" : "#portada"
        },
        "slider" : {
                "imagenes" : [
                    {"url" : "url_imagen", "titulo" : "titulo", "subtitulo" : "subtitulo", "descripcion" : "lorem ipsum", "posicion" : 1},
                    {"url" : "url_imagen", "titulo" : "titulo", "subtitulo" : "subtitulo", "descripcion" : "lorem ipsum", "posicion" : 2},
                    {"url" : "url_imagen", "titulo" : "titulo", "subtitulo" : "subtitulo", "descripcion" : "lorem ipsum", "posicion" : 3},
                    ...
                ],
                "ancla" : "#slider"
        },
        "video" : {"url" : "url_video", "ancla" : "#video"},
        "mapa_ubicacion" : {
            "url" : "url_imagen", 
            "background":"light/black", 
            "align":"left/right",
            "ancla" : "#mapaUbicacion"
            "sitiosInteres" : [
                {"categoria" : "restaurante", "item" : "Item", "descripcion" : "descripcion"},
                {"categoria" : "gym", "item" : "Item", "descripcion" : "descripcion"},
                {"categoria" : "supermercado", "item" : "Item", "descripcion" : "descripcion"},
                {"categoria" : "colegio", "item" : "Item", "descripcion" : "descripcion"},
                ....
            ]

        },
        "texto" : { "titulo" : "titulo", "subtitulo : "subtitulo", "descripcion" : "lorem ipsum", "background":"light/black", "align":"left/right", "ancla" : "#text"}, 
        "texto_imagen" : 
        {
          "titulo" : "titulo", 
          "subtitulo : "subtitulo", 
          "descripcion" : "lorem ipsum", 
          "background":"light/black", 
          "align":"left/right", 
          "ancla" : "#textImagen",
          "url" : "url_imagen"
          // "imagen" : { "url" : "url_imagen", "titulo" : "titulo", "subtitulo" : "subtitulo", "descripcion" : "lorem ipsum"}
         },
        "texto_slider" : 
         {
          "titulo" : "titulo", 
          "subtitulo : "subtitulo", 
          "descripcion" : "lorem ipsum", 
          "background":"light/black", 
          "align":"left/right", 
          "ancla" : "#textSlider",
          "imagenes" : [
                    {"url" : "url_imagen", "posicion" : 1},
                    {"url" : "url_imagen", "posicion" : 2},
                    {"url" : "url_imagen", "posicion" : 3},
                    ...
                ]
         },
        "mapa_unidad" : {
            "url" : "url_imagen",
            "titulo" : "título",
            "subtitulo" : "subtitulo",
            "descripcion" : "descripcion",
            "ancla" : "#mapaUnidad"
            "unidades" : [
                {"unidad":"unidad funcional", "coordenadas" : "coordenadas mouse_over", "atributo_1" : "atributo_1", ... , "atributo_N" : "atributo_N"},
                {"unidad":"unidad funcional", "coordenadas" : "coordenadas mouse_over", "atributo_1" : "atributo_1", ... , "atributo_N" : "atributo_N"},
                {"unidad":"unidad funcional", "coordenadas" : "coordenadas mouse_over", "atributo_1" : "atributo_1", ... , "atributo_N" : "atributo_N"},
                {"unidad":"unidad funcional", "coordenadas" : "coordenadas mouse_over", "atributo_1" : "atributo_1", ... , "atributo_N" : "atributo_N"},
                ...
                ** FALTA PASAR TODOS LOS DATOS A MOSTRAR DE LAS Unidades Funcionales **
            ]
        },
        "Formulario": {"background":"light/black", "align":"left/right", "ancla" : "#form"},
        "Footer": {url" : "url_imagen", "background":"light/black"}

    }


}

```
