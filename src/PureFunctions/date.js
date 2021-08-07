let de = new Date().toISOString().slice(0, 10);
de = de.split("-");
let newde = [];
newde.push(de[0]);
newde.push(de[2]);
newde.push(de[1]);
let final = newde.join("-");
export default final;
