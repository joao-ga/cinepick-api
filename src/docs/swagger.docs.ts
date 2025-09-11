/**
 * Documentação centralizada do Swagger para a CinePick API
 */

export const swaggerPaths = {
  // ===== USERS ENDPOINTS =====
  '/users/createuser': {
    post: {
      summary: 'Criar um novo usuário',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['uid', 'name', 'email'],
              properties: {
                uid: {
                  type: 'string',
                  description: 'ID único do usuário',
                  example: 'user123'
                },
                name: {
                  type: 'string',
                  description: 'Nome do usuário',
                  example: 'João Silva'
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email do usuário',
                  example: 'joao@example.com'
                },
                username: {
                  type: 'string',
                  description: 'Username do usuário',
                  example: 'joaosilva'
                },
                birth: {
                  type: 'string',
                  format: 'date',
                  description: 'Data de nascimento',
                  example: '1990-01-15'
                },
                gender: {
                  type: 'string',
                  description: 'Gênero do usuário',
                  example: 'Masculino'
                },
                phone: {
                  type: 'string',
                  description: 'Número de telefone do usuário',
                  example: '1234567890'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Usuário criado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/getuser/{uid}': {
    get: {
      summary: 'Buscar usuário por UID',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'uid',
          required: true,
          schema: { type: 'string' },
          description: 'UID do usuário',
          example: 'user123'
        }
      ],
      responses: {
        200: {
          description: 'Dados do usuário',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/updateuser': {
    put: {
      summary: 'Atualizar dados do usuário',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['uid'],
              properties: {
                uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                },
                name: {
                  type: 'string',
                  description: 'Novo nome do usuário',
                  example: 'João Santos'
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Novo email do usuário',
                  example: 'joao.santos@example.com'
                },
                birth: {
                  type: 'string',
                  format: 'date',
                  description: 'Nova data de nascimento',
                  example: '1990-01-15'
                },
                gender: {
                  type: 'string',
                  description: 'Novo gênero do usuário',
                  example: 'Masculino'
                },
                phone: {
                  type: 'string',
                  description: 'Novo número de telefone do usuário',
                  example: '1234567890'
                },
                username: {
                  type: 'string',
                  description: 'Novo username do usuário',
                  example: 'joaosilva'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Usuário atualizado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/deleteuser': {
    put: {
      summary: 'Excluir usuário (soft delete)',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['uid'],
              properties: {
                uid: {
                  type: 'string',
                  description: 'UID do usuário a ser excluído',
                  example: 'user123'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Usuário excluído com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Usuário excluído com sucesso'
                  }
                }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/addgenres': {
    put: {
      summary: 'Adicionar gêneros favoritos ao usuário',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['uid', 'genres'],
              properties: {
                uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                },
                genres: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Lista de gêneros favoritos',
                  example: ['Action', 'Drama', 'Comedy']
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Gêneros adicionados com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/addmovies': {
    put: {
      summary: 'Adicionar filmes favoritos ao usuário',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['uid', 'movies'],
              properties: {
                uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                },
                movies: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Lista de IDs de filmes favoritos',
                  example: ['movie1', 'movie2', 'movie3']
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Filmes adicionados com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/getusermovies/{uid}': {
    get: {
      summary: 'Buscar filmes favoritos do usuário',
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'uid',
          required: true,
          schema: { type: 'string' },
          description: 'UID do usuário',
          example: 'user123'
        }
      ],
      responses: {
        200: {
          description: 'Lista de filmes favoritos do usuário',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Movie' }
              }
            }
          }
        },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/recommend': {
    post: {
      summary: 'Recomendar filme baseado nas preferências do usuário',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['uid'],
              properties: {
                uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Filme recomendado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Movie' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/searchuser': {
    get: {
      summary: 'Buscar usuários por nome',
      tags: ['Users'],
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          schema: { type: 'string' },
          description: 'Nome ou parte do nome do usuário',
          example: 'João'
        }
      ],
      responses: {
        200: {
          description: 'Lista de usuários encontrados',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/User' }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/users/followeesmovies': {
    get: {
      summary: 'Buscar filmes favoritos dos usuários seguidos',
      tags: ['Users'],
      parameters: [
        {
          in: 'query',
          name: 'uid',
          required: true,
          schema: { type: 'string' },
          description: 'UID do usuário',
          example: 'user123'
        }
      ],
      responses: {
        200: {
          description: 'Lista de filmes favoritos dos usuários seguidos',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Movie' }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  // ===== MOVIES ENDPOINTS =====
  '/movies/getmovies': {
    get: {
      summary: 'Buscar filmes com filtros opcionais',
      tags: ['Movies'],
      parameters: [
        {
          in: 'query',
          name: 'genres',
          schema: {
            type: 'array',
            items: { type: 'string' }
          },
          style: 'form',
          explode: true,
          description: 'Filtro por gêneros',
          example: ['Action', 'Drama']
        },
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100
          },
          description: 'Número máximo de filmes retornados',
          example: 20
        },
        {
          in: 'query',
          name: 'page',
          schema: {
            type: 'integer',
            minimum: 1
          },
          description: 'Número da página para paginação',
          example: 1
        }
      ],
      responses: {
        200: {
          description: 'Lista de filmes',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Movie' }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/movies/getallgenres': {
    get: {
      summary: 'Buscar todos os gêneros disponíveis',
      tags: ['Movies'],
      responses: {
        200: {
          description: 'Lista de gêneros',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { type: 'string' },
                example: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama']
              }
            }
          }
        },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/movies/getmoviebyname': {
    get: {
      summary: 'Buscar filme por nome',
      tags: ['Movies'],
      parameters: [
        {
          in: 'query',
          name: 'title',
          required: true,
          schema: { type: 'string' },
          description: 'Nome ou parte do nome do filme',
          example: 'The Matrix'
        }
      ],
      responses: {
        200: {
          description: 'Lista de filmes que correspondem ao nome',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Movie' }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  // ===== FOLLOWS ENDPOINTS =====
  '/follows/follow': {
    post: {
      summary: 'Seguir um usuário',
      tags: ['Follows'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['follower_id', 'followee_id'],
              properties: {
                follower_id: {
                  type: 'string',
                  description: 'UID do usuário que vai seguir',
                  example: 'user123'
                },
                followee_id: {
                  type: 'string',
                  description: 'UID do usuário que será seguido',
                  example: 'user456'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Usuário seguido com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Follow' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/follows/unfollow': {
    post: {
      summary: 'Deixar de seguir um usuário',
      tags: ['Follows'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['follower_id', 'followee_id'],
              properties: {
                follower_id: {
                  type: 'string',
                  description: 'UID do usuário que vai deixar de seguir',
                  example: 'user123'
                },
                followee_id: {
                  type: 'string',
                  description: 'UID do usuário que não será mais seguido',
                  example: 'user456'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Usuário deixou de ser seguido com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Usuário deixou de ser seguido com sucesso'
                  }
                }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  // ===== REVIEWS ENDPOINTS =====
  '/reviews/createreview': {
    post: {
      summary: 'Criar uma nova avaliação de um filme',
      tags: ['Reviews'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['user_uid', 'movie_id', 'rating'],
              properties: {
                user_uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                },
                movie_id: {
                  type: 'string',
                  description: 'ID do filme',
                  example: 'movie456'
                },
                rating: {
                  type: 'number',
                  minimum: 1,
                  maximum: 5,
                  description: 'Nota da avaliação (1-5)',
                  example: 4
                },
                comment: {
                  type: 'string',
                  description: 'Comentário da avaliação',
                  example: 'Excelente filme!'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Avaliação criada com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Review' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/reviews/updatereview': {
    put: {
      summary: 'Atualiza uma avaliação de um filme existente',
      tags: ['Reviews'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['user_uid', 'movie_id', 'rating', 'comment'],
              properties: {
                user_uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                },
                movie_id: {
                  type: 'string',
                  description: 'ID do filme',
                  example: 'movie456'
                },
                rating: {
                  type: 'number',
                  minimum: 1,
                  maximum: 5,
                  description: 'Nota da avaliação (1-5)',
                  example: 4
                },
                comment: {
                  type: 'string',
                  description: 'Comentário da avaliação',
                  example: 'Excelente filme!'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Avaliação atualizada com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Review' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/reviews/deletereview': {
    delete: {
      summary: 'Exclui uma avaliação de um filme',
      tags: ['Reviews'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['user_uid', 'movie_id'],
              properties: {
                user_uid: {
                  type: 'string',
                  description: 'UID do usuário',
                  example: 'user123'
                },
                movie_id: {
                  type: 'string',
                  description: 'ID do filme',
                  example: 'movie456'
                },
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Avaliação excluida com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Review' }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/reviews/getuserreview/{uid}': {
    get: {
      summary: 'Buscar avaliações de um usuário específico',
      tags: ['Reviews'],
      parameters: [
        {
          in: 'path',
          name: 'uid',
          required: true,
          schema: { type: 'string' },
          description: 'UID do usuário',
          example: 'user123'
        }
      ],
      responses: {
        200: {
          description: 'Lista de avaliações do usuário',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Review' }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  },

  '/reviews/getuserfollowersreview/{uid}': {
    get: {
      summary: 'Buscar avaliações dos usuários que o usuário segue',
      tags: ['Reviews'],
      parameters: [
        {
          in: 'path',
          name: 'uid',
          required: true,
          schema: { type: 'string' },
          description: 'UID do usuário',
          example: 'user123'
        }
      ],
      responses: {
        200: {
          description: 'Lista de avaliações dos usuários seguidos',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Review' }
              }
            }
          }
        },
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' }
      }
    }
  }
};
