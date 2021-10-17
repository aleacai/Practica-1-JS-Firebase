var firebaseConfig = {
    apiKey: "AIzaSyCK9-U8TcMC3fEK-cbp63_mLJ9zb8ESUFY",
    authDomain: "cecena-19e7d.firebaseapp.com",
    databaseURL: "https://cecena-19e7d-default-rtdb.firebaseio.com",
    projectId: "cecena-19e7d",
    storageBucket: "cecena-19e7d.appspot.com",
    messagingSenderId: "1062300407352",
    appId: "1:1062300407352:web:64f50a5bdab514fb8b78cd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var apellido = document.getElementById("Input3").value;
    var puesto = document.getElementById("Input4").value;
    var telefono = document.getElementById("Input5").value;
    var direccion = document.getElementById("Input6").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var trabajador = {
            id, //id del trabajador:id
            nombre,
            apellido,
            puesto,
            telefono,
            direccion,
        }

        //console.log(trabajador);

        firebase.database().ref('Trabajadores/' + id).update(trabajador).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Trabajadores');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(trabajador){
    
    if(trabajador!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = trabajador.id;
        cell2.innerHTML = trabajador.nombre; 
        cell3.innerHTML = trabajador.apellido;
        cell4.innerHTML = trabajador.puesto; 
        cell5.innerHTML = trabajador.telefono; 
        cell6.innerHTML = trabajador.direccion; 
        cell7.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${trabajador.id})">Eliminar</button>`;
        cell8.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+trabajador.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Trabajadores/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Trabajadores/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(trabajador){
    if(trabajador!=null)
    {
        document.getElementById("Input1").value=trabajador.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=trabajador.nombre;
        document.getElementById("Input3").value=trabajador.apellido;
        document.getElementById("Input4").value=trabajador.puesto;
        document.getElementById("Input5").value=trabajador.telefono;
        document.getElementById("Input6").value=trabajador.direccion;
    }
}


//Para consulta de carrera
function readQ(){
    
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input7").value;
    
    var ref = firebase.database().ref("Trabajadores");
    ref.orderByChild("puesto").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(trabajador){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = trabajador.id;
    cell2.innerHTML = trabajador.nombre; 
    cell3.innerHTML = trabajador.apellido;
    cell4.innerHTML = trabajador.puesto; 
    cell5.innerHTML = trabajador.telefono; 
    cell6.innerHTML = trabajador.direccion; 
   
}