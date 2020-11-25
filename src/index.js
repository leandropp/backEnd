import express from 'express';
import { uuid, isUuid } from 'uuidv4';

const app = express();

app.use(express.json());

const repositories = [];

function validateRepositoryId (request, response, next) {
    const { id } = request.params;

    if (!isUuid(id)) {
        return response
            .status(400)
            .json({ error: 'Invalid repository ID.'});
    }

    return next();

}

app.use('/repositories/:id', validateRepositoryId);

app.get('/repositories', (request, response) => {
    return response.json(repositories);
});

app.post('/repositories', (request, response) => {
    const { title, url, techs } = request.body;
    
    const newRepo = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0,
    };
    repositories.push(newRepo);

    return response.json(newRepo);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, url, techs } = request.body;
    
    const repositoryIndex = repositories.findIndex( repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response
            .status(400)
            .json({ error: 'Repository not found.'});
    }

    const repostitory = {
        id,
        title,
        url,
        techs,
    }

    reposytories[repositoryIndex] = repostitory;

    return response.json(repostitory);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    
    const repositoryIndex = repositories.findIndex( repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response
            .status(400)
            .json({ error: 'Repository not found.'});
    }

    repositories.splice(repositoryIndex, 1);
    return response
        .status(204)
        .send();
});

app.post('/repositories/:id/like', (request, response) => {
    const { id } = request.params;
    
    const repositoryIndex = repositories.findIndex( repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response
            .status(400)
            .json({ error: 'Repository not found.'});
    }

    const { title, url, techs, likes } = repositories[repositoryIndex];
    

    const repostitory = {
        id,
        title,
        url,
        techs,
        likes: likes + 1,
    }

    reposytories[repositoryIndex] = repostitory;

    return response.json(repostitory);
});
