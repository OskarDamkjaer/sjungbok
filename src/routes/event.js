import event from '../../static/event.json'

export const get = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(event))
}
