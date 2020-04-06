//Importo react
import React, { Component, Fragment } from 'react';

import './normalize.css';
import './skeleton.css';
//Importamos los componentes
import Formulario from './componentes/Formulario';
//Importamos el helper function src/helpers.js por destructuring
import { calcularTotal } from './hepers';
import Resultado from './componentes/Resultado';
import Mensaje from './componentes/Mensaje';
import Spinner from './componentes/Spinner';

//defino la clase App que extiende de Component
class App extends Component {

  //definición del objeto
  state = {
    total: '',
    cantidad: '',
    plazo: '',
    cargando: false
  }
  // render() es el unico medoto que es obligatorio en los Class components
  //<Formulario/> hace un llamado a nuestro componente 
  //cunado quiero retornar mas de un elemto dentro del return tengo que
  //rodearlo por un elemento padre. Ejemplo por un div:
  /*
  *<div>
  * <Formulario />
  * <Formulario />
  *</div> 
  o lo hacemos importando Fragment y colocando nuestros elementos
  dentro del elemto  <Fragment></Fragment>. Esta es la mejor forma 

  no puedo usar un class en un etiqueta escribiendo codigo react con JSX
  se debe usar en su lugar className
  */
  
  //creamos el props datosPrestamo para enviar los datos
  //cantidad, plazo son las variables que le paso desde el componente Formulario.js
  datosPrestamo = (cantidad, plazo) => {
    /*console.log(cantidad);
    console.log(plazo);*/

    //Usamos el helper function src/helpers.js
    const total = calcularTotal(cantidad, plazo);

    //setear el state con el total,cantidad, plazo y cargando
    this.setState({
      cargando: true //habilito el sppiner
    }, () => {
      setTimeout(() => {
        this.setState({
          //'total: total' es es igual a si lo coloco así 'total',
          //porque la variable donde almaceno el total (total = calcularTotal(cantidad, plazo);)
          //tiene el mismo nombre de la variable del state(total)
          total,
          cantidad,
          plazo,
          cargando: false //deshabilito el sppiner
        })
      }, 3000);
    })
  }
  // aqui usamos los componentes <Formulario/> y <Resultado/>
  render() { 
      //aplico un destructuring antes del return() para acceder a los datos del state
      const {total, plazo, cantidad, cargando} = this.state;

      //cargar un componente condicionalmente
      let componente;
      if (total=== '' && !cargando) {
        componente=<Mensaje />;
      } else if(cargando){
        componente=<Spinner />;
      } else {
        componente=<Resultado 
                    total={total}
                    plazo={plazo}
                    cantidad={cantidad}
                    />;
      }
      return ( 
        <Fragment>
          <h1>Cotizador de prestamos</h1>
          <div className="container">
            <Formulario 
              //en la variable datosPrestamo en viamos el contenido de la función datosPrestamo()
              datosPrestamo={this.datosPrestamo}
            />
            <div className="mensajes">
              {componente}
            </div>
          </div>
        </Fragment>
       );
  }
}

export default App;
