//Importo react
import React, { Component } from 'react';

//defino la clase Formulario que extiende de Component
class Formulario extends Component {
    state = { 
        cantidad: '',
        plazo: ''
     }

    calcularPrestamo = (e) => {
        e.preventDefault();
        //aplicar desturcturing
        const {cantidad, plazo} = this.state;
        //pasarlo al componente padre
        this.props.datosPrestamo(cantidad, plazo);

    }
    
    //metodo actualizarState
    actualizarState = (e) => {
        //Leer los datos del formulario
        //e.target me indica el elemto en el que estoy escribiendo
        //e.target.value me indica el valor del elemto
        //console.log(e.target.value);

        //Asignación por destructuring
        //Recomendación: Si colocamos el mismo nombre para el elemento html como para el el atributo
        //del state se nos facilitan las cosas.
        //en este caso, los nombres de los elemtos html (cantidad y plazo)
        //son los mismos a las propiedades del objeto 'state' (cantidad y plazo)
        const {name, value} = e.target;

        //Actualizar el state
        this.setState({
            [name] : Number(value)
        })
    }

    habilitarSubmit = () => {
        //aplicar destructuring
        const {cantidad, plazo} = this.state;
        //leer las variables
        const noValido = !cantidad || !plazo
        //console.log(noValido);
        //retornar una respuesta
        return noValido;
    }
    
     // render() es el unico medoto que es obligatorio en los Class components
    render() { 
        
        //accedemos al atributo cantidad del objeto 'state'
        //const {cantidad} = this.state //ojo, para renderizar debo comentar esta linea

        return ( 
            <form onSubmit={this.calcularPrestamo}>
                <div>
                    <label>Cantidad prestamo: </label>
                    <input 
                        //lo que esta entre {} es codigo javascript
                        onChange={this.actualizarState}
                        type="number" 
                        name="cantidad" 
                        className="u-full-width" 
                        placeholder="Ejemplo: 3000" 
                    />
                </div>
                <div>
                    <label>Plazo para pagar: </label>
                    <select  onChange={this.actualizarState} name="plazo" className="u-full-width">
                        <option value="">Seleccionar</option>
                        <option value="3">3 Meses</option>
                        <option value="6">6 Meses</option>
                        <option value="12">12 Meses</option>
                        <option value="24">24 Meses</option>
                    </select>
                </div>
                <div>
                    <input 
                        disabled={this.habilitarSubmit()}
                        type="submit" 
                        value="Calcular" 
                        className="u-full-width button-primary" 
                    />
                </div>
            </form>
         );
    }
}
 
export default Formulario;