export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return { Authorization: 'BEARER ' + token.jwt };
    } else {
        return {};
    }
}
