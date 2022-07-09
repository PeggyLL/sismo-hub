import { Group, Tags, ValueType } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { dataOperators } from "../../helpers/data-operators";

export default new GroupGenerator({
  name: "sismo-citizens",
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const latestSismoDiggersGroup = await Group.store.latest("sismo-diggers");
    const latestSismoDomainsGroup = await Group.store.latest("sismo-domains");

    const sismoCitizensData = dataOperators.Join(
      await latestSismoDiggersGroup.data(),
      await latestSismoDomainsGroup.data()
    );

    return [new Group({
      name: "sismo-citizens",
      generationDate: new Date(context.timestamp),
      data: sismoCitizensData,
      valueType: ValueType.Score,
      tags: [Tags.POAP, Tags.User],
    })];
  },
  generationFrequency: GenerationFrequency.Daily,
});