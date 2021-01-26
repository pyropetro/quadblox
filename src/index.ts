import FieldMaster from './field/FieldMaster'
import TetriminoI from './tetriminoes/TetriminoI';


(function main(): void {
  let fieldMaster = new FieldMaster(15, 30, 18, 'field');

  /* let tetriminoI = new TetriminoI(); */

  console.log(fieldMaster);
  /* console.log(tetriminoI.grid.matrix); */
  fieldMaster.fieldController.addPiece();
  fieldMaster.render();

  /* document.head.appendChild(new ) */
})()
