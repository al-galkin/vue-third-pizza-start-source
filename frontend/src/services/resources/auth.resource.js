import { AuthService } from "@/services/api/auth.service.js";

export class AuthResource extends AuthService {
  constructor() {
    super("/api");
  }
}
