let de = new Date().toISOString().slice(0, 10);
de = de.split('-');
const newde = [];
newde.push(de[0]);
newde.push(de[2]);
newde.push(de[1]);
const final = newde.join('-');
export default final;
