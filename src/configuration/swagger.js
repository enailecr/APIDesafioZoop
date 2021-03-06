const { HOST } = process.env;

const swagger = {
    "swagger": "2.0",
    "info": {
      "description": "Servidor com descrição de todos os países.",
      "version": "1.0.0",
      "title": "API Desafio Zoop",
      "contact": {
        "email": "enaile.crebello@gmail.com"
      },
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    "host": HOST,
    "basePath": "/",
    "tags": [
      {
        "name": "Países",
        "description": "Métodos de países"
      }
    ],
    "schemes": [
        "https",
        "http"
    ],
    "paths": {
      "/paises": {
        "get": {
            "tags": [
              "Países"
            ],
            "summary": "Lista de todos os países",
            "description": "",
            "operationId": "getAll",
            "produces": [
              "application/json"
            ],
            "parameters": [],
            "responses": {
              "200": {
                  "description": "Busca efetuada com sucesso",
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/Paises"
                    }
                  }
              }
            }
          },
        "post": {
          "tags": [
            "Países"
          ],
          "summary": "Adicionar um novo país",
          "description": "",
          "operationId": "insertCountry",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "País a ser cadastrado",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Paises"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "País inserido com sucesso"
            },
            "500": {
                "description": "Erro na requisição"
            }
          }
        }
       },
      "/paises/{nome}": {
        "get": {
          "tags": [
            "Países"
          ],
          "summary": "Busca país pelo nome",
          "description": "Retorna o país",
          "operationId": "getByName",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "nome",
              "in": "path",
              "description": "Nome do país",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "País encontrado",
              "schema": {
                "$ref": "#/definitions/Paises"
              }
            },
            "500": {
              "description": "Erro na requisição"
            },
            "404": {
              "description": "País não encontrado"
            }
          }
        },
        "delete": {
          "tags": [
            "Países"
          ],
          "summary": "Exclui um país",
          "description": "",
          "operationId": "deleteByName",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
                "name": "nome",
                "in": "path",
                "description": "Nome do país",
                "required": true,
                "type": "string"
              }
          ],
          "responses": {
            "200": {
                "description": "País excluído",
                "schema": {
                  "$ref": "#/definitions/Paises"
                }
              },
              "500": {
                "description": "Erro na requisição"
              },
              "404": {
                "description": "País não encontrado"
              }
          }
        }
      },
      "/pais/{id}": {
        "get": {
          "tags": [
            "Países"
          ],
          "summary": "Buscar país por ID",
          "description": "",
          "operationId": "getCountry",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID do país",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "Operação realizada com sucesso",
              "schema": {
                "$ref": "#/definitions/Paises"
              }
            },
            "500": {
              "description": "Erro na requisição"
            },
            "404": {
              "description": "País não encontrado"
            }
          }
        }
      }
    },
    "definitions": {
        "Language": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                }
            },
            "json": {
                "name": "Language"
            }
        },
        "Currency": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                }
            },
            "json": {
                "name": "Currency"
            }
        },
        "Paises": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "example": "Brazil"
                },
                "alpha3Code": {
                    "type": "string",
                    "example": "BRA"
                },
                "population": {
                    "type": "integer",
                    "format": "int64",
                    "example": 2000000
                },
                "languages": {
                    "type": "array",
                    "xml": {
                        "name": "tag",
                        "wrapped": true
                    },
                    "items": {
                        "$ref": "#/definitions/Language"
                    }
                },
                "currencies": {
                    "type": "array",
                    "xml": {
                        "name": "tag",
                        "wrapped": true
                    },
                    "items": {
                        "$ref": "#/definitions/Currency"
                    }
                }
            },
            "json": {
                "name": "Paises"
            }
        }
    }
};

module.exports = swagger;
