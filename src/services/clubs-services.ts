import * as ClubsRepository from "../repositories/clubs-repository";
import * as HttpResponse from "../utils/htttp-helper";

export const getClubService = async () => {
  const data = await ClubsRepository.findAllClubs();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};
