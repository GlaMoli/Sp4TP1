
export function renderizarSuperheroe(superheroe) {
  return {
    NombreSuperHeroe: superheroe.nombreSuperheroe,
    NombreReal: superheroe.nombreReal,
    Edad: superheroe.edad,
    PlanetaDeOrigen: superheroe.planetaOrigen,
    Debilidad: superheroe.debilidad,
    Poderes: superheroe.poder,
    Aliados: superheroe.aliado,
    Enemigos: superheroe.enemigo
  };
}

export function renderizarListaSuperheroes(superheroes) {
  return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}
