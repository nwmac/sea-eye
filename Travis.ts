import { Job } from "./Data";

export class Travis {

  getBranches(job: Job) {
    const repo = job.repo;
    const repoEncoded = repo.replace('/', '%2F');
    return this.fetchData(job, '/repo/' + repoEncoded + '/branches').then((json: any) => {
      const data: any = [];
      if (json && json.branches) {
        json.branches.forEach((item: any) => {
          data.push({
            ...item,
            key: repo + '#' + item.name,
            repo: repo,
            job: job
          });
        });
      } else {
        console.log("ERROR");
      }
      return data;
    });
  }

  getBuilds(job: Job, repo: string, branch: string) {
    const repoEncoded = repo.replace('/', '%2F');
    return this.fetchData(job, '/repo/' + repoEncoded + '/builds?branch.name=' + branch).then((json: any) => {

      return json;
    });
  }

  getBuild(job: Job, number: number) {
    return this.fetchData(job, '/build/' + number.toString()).then((json: any) => {
      return json;
    });
  }

  private fetchData(job: Job, uri: string) {
    return fetch(job.url + uri, {
      method: 'GET',
      headers: {
        Authorization: job.apiKey,
        Content: 'application/json',
        'Travis-API-Version': '3'
      }
    })
    .then((response) => response.json())
    .catch(e => {
      console.log(e);
    });
  }
}
