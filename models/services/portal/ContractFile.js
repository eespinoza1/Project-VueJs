import { Model } from '@/models/Model'
import { Api } from '@/models/Api'

export class ContractFile extends Model {
  constructor(
    contractId,
    data = {
      file: null,
      file_type_id: null,
    }
  ) {
    super(Api.END_POINTS.CONTRACTS_FILES(contractId), data)
  }
}
