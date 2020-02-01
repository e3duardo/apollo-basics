const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v2/";
  }

  async getAllLaunches() {
    const response = await this.get("launches");
    return Array.isArray(response)
      ? response.map(launch => this.launcherReducer(launch))
      : [];
  }

  async getLauncheById({ launchId }) {
    const response = await this.get("launches", { flight_number: launchId });
    return this.launcherReducer(response[0]);
  }

  getLaunchesByIds({ launchIds }) {
    return Promisse.all(
      launchIds.map(launchId => this.getLauncheById({ launchId }))
    );
  }

  launcherReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_pach_small,
        missionPatchLarger: launch.links.mission_pach
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type
      }
    };
  }
}

module.exports = LaunchAPI;
