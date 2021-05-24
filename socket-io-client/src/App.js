import React, { useEffect, useState } from "react";
import './App.css'
import {MapContainer, TileLayer, Polyline} from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import ReactDOM from 'react-dom';
import client from "./components/client.js";
import {Marker} from 'react-leaflet';
import L from 'leaflet';
//import icono from "leaflet/dist/images/marker-icon-2x.png";
import icono from "./assets/planeicon.jpeg";






export default function ClientComponent() {
  
  
  const [flights, setFlights] = useState({});
  //{'starting': {'code': 'starting' ,
   //'position':['20.00000', '20.00000']}}
  //const [markersPos, setMarkersPos] = useState([]);
  const [flightsPos, setFlightsPos] = useState({});
  const [ mensajes, setMensajes] = useState([])


  const IconLocation = L.icon({
      iconUrl: icono,
      iconSize: [30,30],
      
  });
  

 
  
  const Markers = () => {
    
     
      return (
          <div>
          {Object.values(flightsPos).map((vuelo, i) => (
          
            <Marker key = {i} position = {[vuelo[0], vuelo[1]]} icon = {IconLocation} 
              />
          
      ))}
          </div>

      );
    }
  
  const handleSubmit = (event) => {
    client.emit('CHAT', {"name":"me", "message": "Nuevo mensaje"});
  }
  
  const Chat = () => {
    return (
    <div className = 'column-chat'>
    {Object.values(mensajes).map((msn, i) => (
      <li > "De: " { mensajes[i].name}  "|| => "  {mensajes[i].message} <br/> (         
      {Date(mensajes[i].date).slice(16,25)}) </li>
  ))}
      
    </div>

    )}


  useEffect(() => {
    client.emit('FLIGHTS', {});
    return () => {client.off()};
  }, [flights]);
  

  useEffect(() => {
    client.on('FLIGHTS', data => {
      //console.log("recibo vuelos")
      //console.log(data);

      
      setFlights(data);
      /*
      Object.values(flights).map((vuelo, i) => (
        console.log(flights[i].code)
     ))*/

     // const largo = flights.length
      //for (let i = 0 ; i< largo ; i++){
       // console.log(flights[i].code)

      //}
    });


    client.on('POSITION', data => {
      
      const intermediate = flightsPos;
      intermediate[data.code] = [data.position[0], data.position[1]]
      setFlightsPos(intermediate);
     // console.log("NUEVAS POSICIONES =======");
      //console.log(flightsPos);
      //setMarkersPos(position)

    },);

    client.on('CHAT', data => {
      console.log(data);
      const adding = mensajes;
      adding.push(data);
      setMensajes(adding)


    },);

    // CLEAN UP THE EFFECT
    return () => {client.off()};
    //

  },);

  return(
    <div className = "column"> 
    <h3> Vuelos :</h3>
    <ul className = "companylist">
      
    {Object.values(flights).map((vuelo, i) => (
        <li style={{float : 'left', paddingRight : '5px'}} key = {i} >"Codigo: " {flights[i].code} "| Origen: " {flights[i].origin}  "| Destino : "{flights[i].destination}
         "| Aerolinea: "{flights[i].airline}  "| Avión: "{flights[i].plane}  "| Asientos: "{flights[i].seats}
        
        </li>
     ))}
     </ul>

    <MapContainer  center ={{lat: '-35.55555' , lng: '-70.66666'}} zoom = {3}>
        <TileLayer  url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <Markers />
      {Object.values(flights).map((vuelo, i) => (
        <Polyline color = 'black' positions={[flights[i].origin, flights[i].destination]}/>
      ))} 
    </MapContainer>
    <h2> Chat Box</h2>
    <Chat/>
    <input
      type="text" placeholder="Inserte Mensaje" 
      />
      <button text = "Enviar" onSubmit = {handleSubmit}/>
    </div>
  )
  //<Markers vuelos = {{flightsPos}}/>
//return (
  //<mapa/>
//);
//
//let select = document.querySelectorAll(".form-control")[0];
//flights.forEach(e => {
  //select.innerHTML +=  `<option key = "${e.code}" value = "${e.airline}">${e.airline} <option/> `;
  
//});
//return (
  //<select class = 'form-control'>

    //</select>
//)

//const flightList = (
 //<ul> {flights.map((item, i) => <li key = {item+i}> {item['code']}</li>)} </ul>
//)

//ReactDOM.render(flightList, document.getElementById('app'));



//return (
  //<div>
    //<ul>
   // <li> Vuelos : { flights[0].code}</li>
    //<li>Vuelos : { flights[1].code}</li>
    
    //</ul>
    //<p>
      //Position: {position.code}
    //</p>

    //</div>
    //)

  
}

