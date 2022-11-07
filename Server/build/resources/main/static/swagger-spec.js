window.swaggerSpec={
  "openapi" : "3.0.0",
  "info" : {
    "description" : "Service to finances",
    "version" : "1.0.1",
    "title" : "Cheabs Finances"
  },
  "servers" : [ {
    "url" : "http://localhost:{port}/{basePath}",
    "description" : "Local Development Server",
    "variables" : {
      "basePath" : {
        "default" : "1.0.1"
      },
      "port" : {
        "enum" : [ "8080", "8443", "8444", "8445" ],
        "default" : "8445"
      }
    }
  } ],
  "tags" : [ {
    "name" : "Accounts",
    "description" : "Operations regarding accounts"
  }, {
    "name" : "Transactions",
    "description" : "Operations regarding transactions"
  }, {
    "name" : "ParentCategory",
    "description" : "Operations regarding an accounts parent category"
  } ],
  "paths" : {
    "/accounts" : {
      "get" : {
        "tags" : [ "Accounts" ],
        "summary" : "Get all accounts",
        "operationId" : "getAllAccounts",
        "responses" : {
          "200" : {
            "description" : "successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/Account"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/accounts/add" : {
      "post" : {
        "tags" : [ "Accounts" ],
        "summary" : "Create an account",
        "operationId" : "createAccount",
        "requestBody" : {
          "description" : "Create Account body",
          "required" : true,
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CreateAccountBody"
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "successful operation"
          }
        }
      }
    },
    "/accounts/{id}" : {
      "get" : {
        "tags" : [ "Accounts" ],
        "summary" : "Get account by id",
        "operationId" : "getAccountById",
        "parameters" : [ {
          "name" : "id",
          "in" : "path",
          "description" : "The id that needs to be fetched. Use 1 for testing. ",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "description" : "successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Account"
                }
              }
            }
          },
          "404" : {
            "description" : "Account not found"
          }
        }
      }
    },
    "/transactions" : {
      "get" : {
        "tags" : [ "Transactions" ],
        "summary" : "Gets all the transactions",
        "operationId" : "getAllTransactions",
        "responses" : {
          "200" : {
            "description" : "successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/Transaction"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/transactions/add" : {
      "post" : {
        "tags" : [ "Transactions" ],
        "summary" : "Create a transaction",
        "operationId" : "createTransaction",
        "requestBody" : {
          "description" : "Create Transaction body",
          "required" : true,
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CreateTransactionBody"
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "successful operation"
          }
        }
      }
    },
    "/parentCategory" : {
      "get" : {
        "tags" : [ "ParentCategory" ],
        "summary" : "Get all parent categories",
        "operationId" : "getAllParentCategories",
        "responses" : {
          "200" : {
            "description" : "successful operation",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "$ref" : "#/components/schemas/ParentCategory"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/parentCategory/add" : {
      "post" : {
        "tags" : [ "ParentCategory" ],
        "summary" : "Create a parent category",
        "operationId" : "createParentCategory",
        "requestBody" : {
          "description" : "Create Account body",
          "required" : true,
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "string"
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "successful operation"
          }
        }
      }
    }
  },
  "components" : {
    "schemas" : {
      "Account" : {
        "type" : "object",
        "x-jpa" : true,
        "properties" : {
          "id" : {
            "type" : "string",
            "x-idField" : true,
            "x-generatedId" : true
          },
          "name" : {
            "type" : "string"
          },
          "type" : {
            "$ref" : "#/components/schemas/TypeEnum"
          },
          "balance" : {
            "type" : "number",
            "format" : "float"
          },
          "parentCategory" : {
            "type" : "string"
          }
        }
      },
      "Transaction" : {
        "type" : "object",
        "x-jpa" : true,
        "properties" : {
          "id" : {
            "type" : "string",
            "x-idField" : true,
            "x-generatedId" : true
          },
          "description" : {
            "type" : "string"
          },
          "credit-account-id" : {
            "type" : "string"
          },
          "debit-account-id" : {
            "type" : "string"
          },
          "amount" : {
            "type" : "number",
            "format" : "float"
          },
          "date" : {
            "type" : "string",
            "format" : "date"
          }
        }
      },
      "ParentCategory" : {
        "type" : "object",
        "x-jpa" : true,
        "properties" : {
          "id" : {
            "type" : "string",
            "x-idField" : true,
            "x-generatedId" : true
          },
          "name" : {
            "type" : "string"
          }
        }
      },
      "CreateAccountBody" : {
        "type" : "object",
        "properties" : {
          "name" : {
            "type" : "string"
          },
          "type" : {
            "$ref" : "#/components/schemas/TypeEnum"
          },
          "parentCategory" : {
            "type" : "string"
          },
          "balance" : {
            "type" : "number",
            "format" : "float"
          }
        }
      },
      "CreateTransactionBody" : {
        "type" : "object",
        "properties" : {
          "description" : {
            "type" : "string"
          },
          "credit-account-name" : {
            "type" : "string"
          },
          "debit-account-name" : {
            "type" : "string"
          },
          "amount" : {
            "type" : "number",
            "format" : "float"
          },
          "date" : {
            "type" : "string",
            "format" : "date"
          }
        }
      },
      "TypeEnum" : {
        "type" : "string",
        "enum" : [ "Actual", "Paper" ]
      }
    }
  }
}