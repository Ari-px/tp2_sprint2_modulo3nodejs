// Conectar a la base de datos con mongoose
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://Grupo-09:grupo09@cursadanodejs.ls9ii.mongodb.net/Node-js')

.then(()=> console.log('Conexion exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:',error));


// Esquema y modelo para superheroes
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe:{type:String,required:true},
    nombreReal:{type:String,required:true},
    edad: {type :Number,min:0},
    planetaOrigen:{type:String,default:'Desconocido'},
    debilidad:String,
    poderes:[String],
    aliados:[String],
    enemigos:[String],
    createdAt:{type:Date,default:Date.now},
      creador:String
},{collection:'Grupo-09'});

const SuperHero = mongoose.model('SuperHero',superheroSchema);


// Inserta nuevo superheroe
async function insertSuperHero()
{
    const hero = new SuperHero({
        nombreSuperHeroe:'Spiderman',
        nombreReal:'Peter Parker',
        edad: 25,
        planetaOrigen:'Tierra',
        debilidad:'Radioactiva',
        poderes: ['Trepar paredes','Sentido arácnico','Super fuerza','Agilidad'],
        aliados: ['Ironman'],
        enemigos:['Duende Verde'],
        creador:'Ariana'
    });
    await hero.save();
    console.log('Superhéroe insertado:',hero);
}
insertSuperHero();



// Actualizar un superheroe

async function updateSuperHero(nombreSuperHeroe)
{
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe},
        { $set: { edad:26 } }
    );
    console.log('Resultado de la actualizacion:',result);
}
updateSuperHero('Spiderman');




// Eliminar un superheroe
async function deleteSuperHero(nombreSuperHeroe)
{
    const result = await SuperHero.deleteOne({ nombreSuperHeroe : nombreSuperHeroe});
    console.log('Superheroe eliminado:',result);
}
deleteSuperHero('Spiderman');



// Buscar superheroes
async function findSuperHeroes()
{
    const heroes = await SuperHero.find({planetaOrigen:'Tierra'});
    console.log('Superhéroes encontrados:',heroes);
}
findSuperHeroes();