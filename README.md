
# Github-User-Activity-CLI

 Este es un simple script de Node que imprime a la consola actividad reciente de un usuario de github.


## Uso
El scipt solo usa node. Por lo que *no* necesitas dependencias extra. Simplemente lo corres asi:
```bash
  node dist/main.js <nombre_de_usuario>
```
Recuerda que los nombre de usuario que sólo contengan carácteres alfanuméricos, guiones individuales y no terminen o empiezen con un guión son válidos.



## Errores
El script lanzará errores si:

- El nombre de usuario es inválido
- El usuario no existe (Error 404) o algún otro problema de red

