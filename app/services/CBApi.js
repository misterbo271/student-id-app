import CBConfig from 'configs/CBConfig';
import CBService from 'services/CBService';

export default class CBApi extends CBService {
    constructor() {
        super(CBConfig.API_URL);
    }

    createStudent(body, showLoading = true, showError = true) {
        return this.POST('/schools/create-students', body, showLoading, showError);
    }

    submitStudent(body, showLoading = true, showError = true) {
        return this.POST('/students/submit', body, showLoading, showError);
    }

    getStudent(query, showLoading = true, showError = true) {
        return this.GET(`/students/student`, query, showLoading, showError);
    }

    updateStudent(body, showLoading = true, showError = true) {
        return this.POST('/students/update', body, showLoading, showError);
    }

}