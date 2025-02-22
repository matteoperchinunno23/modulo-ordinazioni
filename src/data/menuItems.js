// src/data/menuItems.js
export const menuItems = {
    panini: {
      title: "Panini",
      items: [
        { id: "salamella", name: "Panino con salamella", price: 3.50 },
        { id: "wurstel", name: "Panino con würstel", price: 3.50 },
        { id: "verdure_panino", name: "Panino con verdure", price: 3.20 },
      ]
    },
    primi: {
      title: "Primi Piatti",
      items: [
        { id: "pasta_sugo", name: "Pasta al sugo", price: 1.20 },
        { id: "pasta_ragu", name: "Pasta al ragù", price: 1.50 },
        { id: "pasta_bianca", name: "Pasta in bianco", price: 1.00 },
      ]
    },
    contorni: {
      title: "Contorni",
      items: [
        { id: "verdure", name: "Verdure", price: 1.10 },
        { id: "patatine_piccole", name: "Patatine fritte piccole", price: 1.50 },
        { id: "patatine_medie", name: "Patatine fritte medie", price: 1.10 },
        { id: "patatine_grandi", name: "Patatine fritte grandi", price: 1.00 },
      ]
    },
    salse: {
      title: "Salse",
      items: [
        { id: "ketchup", name: "Ketchup", price: 0.40 },
        { id: "maionese", name: "Maionese", price: 0.40 },
      ]
    },
    bevande: {
      title: "Bevande",
      items: [
        { id: "acqua_frizzante", name: "Acqua frizzante 0,5L", price: 1.00 },
        { id: "acqua_naturale", name: "Acqua naturale 0,5L", price: 1.00 },
        { id: "birra_media", name: "Birra media", price: 1.10 },
        { id: "birra_piccola", name: "Birra piccola", price: 1.00 },
        { id: "vino_bianco", name: "Vino bianco", price: 2.00 },
        { id: "vino_rosso", name: "Vino rosso", price: 2.00 },
      ]
    },
    dolci: {
      title: "Dolci",
      items: [
        { id: "torta_margherita", name: "Torta margherita", price: 1.00 },
        { id: "torta_cioccolato", name: "Torta al cioccolato", price: 1.00 },
        { id: "brownies", name: "Brownies", price: 1.00 },
        { id: "crepes", name: "Crepes", price: 1.00 },
      ]
    }
  };