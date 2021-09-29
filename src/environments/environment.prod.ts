export const environment = {
  production: true,
  apiUrl: 'https://intense-taiga-29233.herokuapp.com/',
  geturl() {
    return `${this.apiUrl}/projects`;
  },
  postUrl() {
    return `${this.apiUrl}/todos`;
  },
  patchUrl(project_id: number, todo_id: number) {
    return `${this.apiUrl}/projects/${project_id}/todo/${todo_id}`;
  },
};
