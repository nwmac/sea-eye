import { BuildStatus, Job } from "./Data";

export class Jenkins {

  getJobs(job: Job) {
    return this.fetchData(job.url).then((json: any) => {
      const data: any = [];
      json.jobs.forEach((item: any) => {
        data.push({
          job: job,
          jenkins: item,
          exists_on_github: true,
          name: item.fullDisplayName,
          last_build: {
            previous_state: 'passed',
            state: this.getState(item),
            number: item.lastBuild.number.toString(),
            started_at: new Date(item.lastBuild.timestamp).toString(),
            finished_at: new Date(item.lastBuild.timestamp).toString()
          },
          key: job.url + '#' + item.fullDisplayName,
          repo: job.repo
        });
      });
      return data;
    });
  }

  getState(item: any): BuildStatus {
    if (item.building) {
      return 'started'
    } else if (item.inQueue) {
      return 'created'
    } else if (item.lastBuild.result === 'SUCCESS') {
      return 'passed';
    } else if (item.lastBuild.result === 'FAILURE') {
      return 'failed';
    } else if (item.lastBuild.result === 'ABORTED') {
      return 'canceled';
    } else {
      return 'unknown';
    }
  }
  
  getBuilds(repo: string, branch: string) {
    const repoEncoded = repo.replace('/', '%2F');
    return this.fetchData('/repo/' + repoEncoded + '/builds?branch.name=' + branch).then((json: any) => {
      return json;
    });
  }

  getBuild(number: number) {
    return this.fetchData('/build/' + number.toString()).then((json: any) => {
      return json;
    });
  }

  private fetchData(uri: string) {
    return fetch(uri, {
      method: 'GET',
      headers: {
        Content: 'application/json',
      }
    })
    .then((response) => response.json())
    .catch(e => {
      console.log('ERROR')
      console.log(e);
    });
  }
}
