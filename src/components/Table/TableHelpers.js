export const createData = (name, calories, fat, carbs, protein) => {
	return {
	  name,
	  calories,
	  fat,
	  carbs,
	  protein,
	}
}

export const defaultRows = [
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Donut", 452, 25.0, 51, 4.9),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
	createData("Honeycomb", 408, 3.2, 87, 6.5),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Jelly Bean", 375, 0.0, 94, 0.0),
	createData("KitKat", 518, 26.0, 65, 7.0),
	createData("Lollipop", 392, 0.2, 98, 0.0),
	createData("Marshmallow", 318, 0, 81, 2.0),
	createData("Nougat", 360, 19.0, 9, 37.0),
	createData("Oreo", 437, 18.0, 63, 4.0),
]

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// * This constant could be helpful to know if you have a Pokemon
// const createdPokemon = [
//   "my_name",
//   "my_description",
//   "my_types",
//   "my_teammates",
//   "my_sprite",
// ];
