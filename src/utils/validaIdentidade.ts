export const validaCPF = (valor: string): boolean => {
  if (valor.length === 11) {
    let cpf: string | string[] = valor.trim();

    cpf = cpf.split("");

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] != cpf[i]) {
        aux = true;
      }
    }

    if (aux == false) {
      return false;
    }

    for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
      v1 += (cpf[i] as unknown as number) * p;
    }

    v1 = (v1 * 10) % 11;

    if (v1 == 10) {
      v1 = 0;
    }

    if (v1 != (cpf[9] as unknown as number)) {
      return false;
    }

    for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
      v2 += (cpf[i] as unknown as number) * p;
    }

    v2 = (v2 * 10) % 11;

    if (v2 == 10) {
      v2 = 0;
    }

    if (v2 != (cpf[10] as unknown as number)) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const validaCNPJ = (valor: string) => {
  if (valor.length === 14) {
    let cnpj: string | string[] = valor.trim();

    cnpj = cnpj.split("");

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cnpj.length > i; i++) {
      if (cnpj[i - 1] != cnpj[i]) {
        aux = true;
      }
    }

    if (aux == false) {
      return false;
    }

    for (let i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v1 += (cnpj[i] as unknown as number) * p1;
      } else {
        v1 += (cnpj[i] as unknown as number) * p2;
      }
    }

    v1 = v1 % 11;

    if (v1 < 2) {
      v1 = 0;
    } else {
      v1 = 11 - v1;
    }

    if (v1 != (cnpj[12] as unknown as number)) {
      return false;
    }

    for (let i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += (cnpj[i] as unknown as number) * p1;
      } else {
        v2 += (cnpj[i] as unknown as number) * p2;
      }
    }

    v2 = v2 % 11;

    if (v2 < 2) {
      v2 = 0;
    } else {
      v2 = 11 - v2;
    }

    if (v2 != (cnpj[13] as unknown as number)) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
