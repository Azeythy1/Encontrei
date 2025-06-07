/**
 * Categorias de produtos e seus campos obrigatórios
 * @type {Object.<string, {requiredFields: string[], optionalFields: string[]}>}
 */
export const categories = {
  Smartphone: {
    requiredFields: ["Armazenamento", "Memória RAM", "Tela", "Processador", "Bateria"],
    optionalFields: ["NFC", "E-SIM"]
  },
  Notebook: {
    requiredFields: ["Processador", "RAM", "Armazenamento", "Tela", "Sistema Operacional"],
    optionalFields: ["GPU", "Portas"]
  },
  Tablet: {
    requiredFields: ["Tela", "Armazenamento", "Bateria", "Sistema Operacional"],
    optionalFields: ["Caneta", "Teclado"]
  },
  "Video Game": {
    requiredFields: ["Armazenamento", "Resolução", "Controles", "GPU"],
    optionalFields: ["Assinatura", "Mídia Física"]
  }
};

/**
 * Lista de produtos cadastrados
 * @type {Array<Object>}
 */
const products = [
  {
    id: 1,
    category: "Smartphone",
    brand: "Xiaomi",
    model: "Redmi Note 13 Pro",
    image: "",
    specs: {
      "Armazenamento": "256GB",
      "Memória RAM": "12GB",
      "Tela": "6.67\" AMOLED",
      "Processador": "Snapdragon 7s Gen 2",
      "Bateria": "5000mAh"
    }
  }
  
];

export default products;