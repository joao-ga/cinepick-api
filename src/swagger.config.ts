import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { swaggerPaths } from './docs/swagger.docs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CinePick API',
      version: '1.0.0',
      description: 'API para gerenciamento de filmes, usuários, avaliações e seguir usuários - CinePick',
      contact: {
        name: 'CinePick Team',
        email: 'contact@cinepick.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Servidor de desenvolvimento'
      }
    ],
    paths: swaggerPaths,
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            uid: {
              type: 'string',
              description: 'ID único do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            username: {
              type: 'string',
              description: 'Username do usuário'
            },
            birth: {
              type: 'string',
              format: 'date',
              description: 'Data de nascimento'
            },
            gender: {
              type: 'string',
              description: 'Gênero do usuário'
            },
            phone: {
              type: 'string',
              description: 'Número de telefone do usuário'
            },
            genres: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Gêneros favoritos do usuário'
            },
            movies: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Filmes favoritos do usuário'
            }
          },
          required: ['uid', 'name', 'email', 'username']
        },
        Movie: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID do filme'
            },
            title: {
              type: 'string',
              description: 'Título do filme'
            },
            year: {
              type: 'number',
              description: 'Ano de lançamento'
            },
            genres: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Gêneros do filme'
            },
            plot: {
              type: 'string',
              description: 'Sinopse do filme'
            },
            poster: {
              type: 'string',
              description: 'URL do poster'
            },
            imdb: {
              type: 'object',
              properties: {
                rating: {
                  type: 'number',
                  description: 'Avaliação IMDB'
                },
                votes: {
                  type: 'number',
                  description: 'Número de votos IMDB'
                },
                id: {
                  type: 'number',
                  description: 'ID IMDB'
                }
              }
            }
          }
        },
        Review: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID da avaliação'
            },
            user_uid: {
              type: 'string',
              description: 'UID do usuário que fez a avaliação'
            },
            movie_id: {
              type: 'string',
              description: 'ID do filme avaliado'
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Nota da avaliação (1-5)'
            },
            comment: {
              type: 'string',
              description: 'Comentário da avaliação'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da avaliação'
            }
          },
          required: ['user_uid', 'movie_id', 'rating', 'comment']
        },
        Follow: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID do relacionamento de seguir'
            },
            follower_id: {
              type: 'string',
              description: 'UID de quem está seguindo'
            },
            followee_id: {
              type: 'string',
              description: 'UID de quem está sendo seguido'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do relacionamento'
            }
          },
          required: ['follower_id', 'followee_id']
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Requisição inválida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: [] // Array vazio necessário para o swagger-jsdoc funcionar
};

const specs = swaggerJSDoc(options);

export function setupSwagger(app: Application): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'CinePick API Documentation'
  }));
  
  // Rota para obter a especificação JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}

export { specs };
