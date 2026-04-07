// Задание фильтров
// Список доступных фильтров
const filtersComplexity = [
  "filterComplexityInitial",
  "filterComplexityMiddle",
  "filterComplexityAdvanced",
];
const filtersLibrary = [
  "filterLibraryVanillajs",
  "filterLibraryP5js",
  "filterLibraryThreejs",
];
const filtersFormat = [
  "filterFormatTechnique",
  "filterFormatTask",
  "filterFormatVariation",
];
const filtersVerification = [
  "filterVerificationExpert",
  "filterVerificationAuthorial",
];
export const filtersAll = [
  filtersComplexity,
  filtersLibrary,
  filtersFormat,
  filtersVerification,
];

// Какие фильтры у каких модулей
// p1m1
const setFiltersPart1Module1Tutorial1 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart1Module1Tutorial2 = new Set([
  "filterComplexityInitial",
  "filterLibraryP5js",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart1Module1Tutorial3 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
// m-t
const filtersPart1Module1 = [
  setFiltersPart1Module1Tutorial1,
  setFiltersPart1Module1Tutorial2,
  setFiltersPart1Module1Tutorial3,
];
// p-m
const setFiltersPart1Module1 = new Set([
  ...setFiltersPart1Module1Tutorial1,
  ...setFiltersPart1Module1Tutorial2,
  ...setFiltersPart1Module1Tutorial3,
]);
// p1m2
const setFiltersPart1Module2Tutorial1 = new Set([
  "filterComplexityInitial",
  "filterLibraryP5js",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart1Module2Tutorial2 = new Set([
  "filterComplexityInitial",
  "filterLibraryP5js",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart1Module2Tutorial3 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart1Module2Tutorial4 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart1Module2Tutorial5 = new Set([
  "filterComplexityInitial",
  "filterLibraryVanillajs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
// m-t
const filtersPart1Module2 = [
  setFiltersPart1Module2Tutorial1,
  setFiltersPart1Module2Tutorial2,
  setFiltersPart1Module2Tutorial3,
  setFiltersPart1Module2Tutorial4,
  setFiltersPart1Module2Tutorial5,
];
// p-m
const setFiltersPart1Module2 = new Set([
  ...setFiltersPart1Module2Tutorial1,
  ...setFiltersPart1Module2Tutorial2,
  ...setFiltersPart1Module2Tutorial3,
]);
const filtersPart1 = [setFiltersPart1Module1, setFiltersPart1Module2];
// p2m1
const setFiltersPart2Module1Tutorial1 = new Set([
  "filterComplexityMiddle",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart2Module1Tutorial2 = new Set([
  "filterComplexityMiddle",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart2Module1Tutorial3 = new Set([
  "filterComplexityMiddle",
  "filterLibraryVanillajs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
// m-t
const filtersPart2Module1 = [
  setFiltersPart2Module1Tutorial1,
  setFiltersPart2Module1Tutorial2,
  setFiltersPart2Module1Tutorial3,
];
//p-m
const setFiltersPart2Module1 = new Set([
  ...setFiltersPart2Module1Tutorial1,
  ...setFiltersPart2Module1Tutorial2,
  ...setFiltersPart2Module1Tutorial3,
]);
// p2m2
const setFiltersPart2Module2Tutorial1 = new Set([
  "filterComplexityMiddle",
  "filterLibraryP5js",
  "filterFormatVariation",
  "filterVerificationExpert",
]);
const setFiltersPart2Module2Tutorial2 = new Set([
  "filterComplexityMiddle",
  "filterLibraryP5js",
  "filterFormatVariation",
  "filterVerificationExpert",
]);
const setFiltersPart2Module2Tutorial3 = new Set([
  "filterComplexityMiddle",
  "filterLibraryP5js",
  "filterFormatTask",
  "filterVerificationExpert",
]);
// m-t
const filtersPart2Module2 = [
  setFiltersPart2Module2Tutorial1,
  setFiltersPart2Module2Tutorial2,
  setFiltersPart2Module2Tutorial3,
];
// p-m
const setFiltersPart2Module2 = new Set([
  ...setFiltersPart2Module2Tutorial1,
  ...setFiltersPart2Module2Tutorial2,
  ...setFiltersPart2Module2Tutorial3,
]);
// p2m3
const setFiltersPart2Module3Tutorial1 = new Set([
  "filterComplexityMiddle",
  "filterLibraryThreejs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart2Module3Tutorial2 = new Set([
  "filterComplexityMiddle",
  "filterLibraryThreejs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart2Module3Tutorial3 = new Set([
  "filterComplexityMiddle",
  "filterLibraryThreejs",
  "filterFormatVariation",
  "filterVerificationExpert",
]);
// m-t
const filtersPart2Module3 = [
  setFiltersPart2Module3Tutorial1,
  setFiltersPart2Module3Tutorial2,
  setFiltersPart2Module3Tutorial3,
];
// p-m
const setFiltersPart2Module3 = new Set([
  ...setFiltersPart2Module3Tutorial1,
  ...setFiltersPart2Module3Tutorial2,
  ...setFiltersPart2Module3Tutorial3,
]);
const filtersPart2 = [
  setFiltersPart2Module1,
  setFiltersPart2Module2,
  setFiltersPart2Module3,
];
// p3m1
const setFiltersPart3Module1Tutorial1 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryP5js",
  "filterFormatVariation",
  "filterVerificationExpert",
]);
const setFiltersPart3Module1Tutorial2 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryThreejs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart3Module1Tutorial3 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryThreejs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
// m-t
const filtersPart3Module1 = [
  setFiltersPart3Module1Tutorial1,
  setFiltersPart3Module1Tutorial2,
  setFiltersPart3Module1Tutorial3,
];
// p-m
const setFiltersPart3Module1 = new Set([
  ...setFiltersPart3Module1Tutorial1,
  ...setFiltersPart3Module1Tutorial2,
  ...setFiltersPart3Module1Tutorial3,
]);
// p3m2
const setFiltersPart3Module2Tutorial1 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryThreejs",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart3Module2Tutorial2 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryVanillajs",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart3Module2Tutorial3 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryThreejs",
  "filterFormatVariation",
  "filterVerificationExpert",
]);
// m-t
const filtersPart3Module2 = [
  setFiltersPart3Module2Tutorial1,
  setFiltersPart3Module2Tutorial2,
  setFiltersPart3Module2Tutorial3,
];
// p-m
const setFiltersPart3Module2 = new Set([
  ...setFiltersPart3Module2Tutorial1,
  ...setFiltersPart3Module2Tutorial2,
  ...setFiltersPart3Module2Tutorial3,
]);
// p3m3
const setFiltersPart3Module3Tutorial1 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryP5js",
  "filterFormatTask",
  "filterVerificationExpert",
]);
const setFiltersPart3Module3Tutorial2 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryP5js",
  "filterFormatTechnique",
  "filterVerificationExpert",
]);
const setFiltersPart3Module3Tutorial3 = new Set([
  "filterComplexityAdvanced",
  "filterLibraryVanillajs",
  "filterFormatVariation",
  "filterVerificationExpert",
]);
// m-t
const filtersPart3Module3 = [
  setFiltersPart3Module3Tutorial1,
  setFiltersPart3Module3Tutorial2,
  setFiltersPart3Module3Tutorial3,
];
// p-m
const setFiltersPart3Module3 = new Set([
  ...setFiltersPart3Module3Tutorial1,
  ...setFiltersPart3Module3Tutorial2,
  ...setFiltersPart3Module3Tutorial3,
]);
const filtersPart3 = [
  setFiltersPart3Module1,
  setFiltersPart3Module2,
  setFiltersPart3Module3,
];

// p
export const filtersParts = [filtersPart1, filtersPart2, filtersPart3];

// m
export const filtersModules = [
  filtersPart1Module1,
  filtersPart1Module2,
  filtersPart2Module1,
  filtersPart2Module2,
  filtersPart2Module3,
  filtersPart3Module1,
  filtersPart3Module2,
  filtersPart3Module3,
];