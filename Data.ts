import { Travis } from "./Travis";
import { TouchableWithoutFeedbackBase } from "react-native";
import { Jenkins } from "./Jenkins";
import Config from "./Config";

export type BuildStatus = 'unknown' | 'passed' | 'failed' | 'canceled' | 'started' | 'created';

export type JobType = 'travis' | 'jenkins';

export interface Job {
  type: JobType;
  webView?: string;
  url: string;
  repo: string;
  apiKey: string;
}

export default class Data {

  static store = new Data();

  public jobs = [] as Job[];

  private travis: Travis;
  private jenkins: Jenkins;

  constructor() {
    this.travis = new Travis();
    this.jenkins = new Jenkins();

    const config = new Config();
    this.jobs = config.getJobs();
  }

  fetch() {
    const promises = [] as Promise<any>[];
    this.jobs.forEach(job => {
      if (job.type === 'travis') {
        promises.push(this.travis.getBranches(job));
      } else if (job.type === 'jenkins') {
        promises.push(this.jenkins.getJobs(job));
      }
    });

    return Promise.all(promises).then(data => {
      let combined = [] as any[];
      data.forEach(d => combined = combined.concat(d));
      combined = combined.filter(branch => branch.exists_on_github);
      return combined;
    });
  }

  fetchBuilds(job: Job, build: any) {
    return this.travis.getBuilds(job, build.repo, build.name);
  }

  fetchBuild(job: Job, number: number) {
    return this.travis.getBuild(job, number);
  }

  branchColor(state: string): string {
    switch (state) {
      case 'canceled':
        return '#777';
      case 'failed':
        return 'red'
      case 'passed':
        return 'green';
      case 'started':
        return '#2960c6';
      case 'created':
        return '#2960c6';
      default:
        return '#777';
    }
  }

  public static mapJenkinsStatus(result: string, build: any): BuildStatus {
    if (build.building) {
      return 'started'
    } else if (build.inQueue) {
      return 'created'
    } else if (result === 'SUCCESS') {
      return 'passed';
    } else if (result === 'FAILURE') {
      return 'failed';
    } else if (result === 'ABORTED') {
      return 'canceled';
    } else {
      return 'unknown';
    }
  }

  public static getBranchColor(state: string, jenkinsBuild?: any) {
    let status = state;
    if (jenkinsBuild) {
      status = Data.mapJenkinsStatus(status, jenkinsBuild);
    }
    switch (status) {
      case 'canceled':
        return '#777';
      case 'failed':
        return 'red'
      case 'passed':
        return 'green';
      case 'started':
        return '#2960c6';
      case 'created':
        return '#2960c6';
      default:
        return '#777';
    }
  }

  public static getBranchIcon(state: string, jenkinsBuild?: any) {
    let status = state;
    if (jenkinsBuild) {
      status = Data.mapJenkinsStatus(status, jenkinsBuild);
    }
    switch (status) {
      case 'canceled':
        return 'do-not-disturb-on';
      case 'failed':
        return 'cancel'
      case 'passed':
        return 'check-circle';
      case 'created':
        return 'pause-circle-filled';
      case 'started':
        return 'play-circle-filled';
      default:
        return 'help';
    }

  }
}