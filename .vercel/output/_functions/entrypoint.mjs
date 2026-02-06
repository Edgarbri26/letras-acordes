import { g as getActionQueryString, a as astroCalledServerError, A as ActionError, d as deserializeActionResult, b as ACTION_QUERY_PARAMS, c as appendForwardSlash } from './chunks/astro-designed-error-pages_M5oOGqjH.mjs';
import 'piccolore';
import 'es-module-lexer';
import './chunks/astro/server_D9QA4LpJ.mjs';
import 'clsx';
import * as z from 'zod';
import { A as API_URL } from './chunks/songs_BpP3uNMI.mjs';
import { d as defineAction } from './chunks/server_DDE7DnxM.mjs';

const internalFetchHeaders = {};

const apiContextRoutesSymbol = Symbol.for("context.routes");
const ENCODED_DOT = "%2E";
function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (target.hasOwnProperty(objKey) || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + encodeURIComponent(objKey.toString()).replaceAll(".", ENCODED_DOT);
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // redefine prototype methods as the object's own property, not the prototype's
        bind: action.bind,
        valueOf: () => action.valueOf,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
function _getActionPath(toString) {
  let path = `${"/".replace(/\/$/, "")}/_actions/${new URLSearchParams(toString()).get(ACTION_QUERY_PARAMS.actionName)}`;
  {
    path = appendForwardSlash(path);
  }
  return path;
}
async function handleAction(param, path, context) {
  if (context) {
    const pipeline = Reflect.get(context, apiContextRoutesSymbol);
    if (!pipeline) {
      throw astroCalledServerError();
    }
    const action = await pipeline.getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
  const headers = new Headers();
  headers.set("Accept", "application/json");
  for (const [key, value] of Object.entries(internalFetchHeaders)) {
    headers.set(key, value);
  }
  let body = param;
  if (!(body instanceof FormData)) {
    try {
      body = JSON.stringify(param);
    } catch (e) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: `Failed to serialize request body to JSON. Full error: ${e.message}`
      });
    }
    if (body) {
      headers.set("Content-Type", "application/json");
    } else {
      headers.set("Content-Length", "0");
    }
  }
  const rawResult = await fetch(
    _getActionPath(() => getActionQueryString(path)),
    {
      method: "POST",
      body,
      headers
    }
  );
  if (rawResult.status === 204) {
    return deserializeActionResult({ type: "empty", status: 204 });
  }
  const bodyText = await rawResult.text();
  if (rawResult.ok) {
    return deserializeActionResult({
      type: "data",
      body: bodyText,
      status: 200,
      contentType: "application/json+devalue"
    });
  }
  return deserializeActionResult({
    type: "error",
    body: bodyText,
    status: rawResult.status,
    contentType: "application/json"
  });
}
toActionProxy();

const register = async (name, email, password, phoneNumber) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, phoneNumber })
  });
  return response;
};
const login = async (email, password) => {
  if (!email || !password) {
    console.error("Email and Password are required");
    return null;
  }
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });
  return response;
};

if (typeof window !== "undefined") {
  throw new Error("Supabase client cannot be used on the client-side. Please use the backend API.");
}
{
  console.error("Missing Supabase environment variables: PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY");
}
const supabase = {
  auth: {
    signUp: () => Promise.resolve({ data: null, error: { message: "Servicio no disponible" } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: { message: "Servicio no disponible" } })
  },
  from: () => ({
    select: () => ({ eq: () => Promise.resolve({ data: [], error: null }) }),
    insert: () => {
      const response = Promise.resolve({ error: { message: "Servicio no disponible" }, data: null });
      return {
        select: () => ({
          single: () => response
        }),
        then: (onfulfilled) => response.then(onfulfilled)
      };
    },
    update: () => ({ eq: () => Promise.resolve({ error: { message: "Servicio no disponible" } }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: { message: "Servicio no disponible" } }) })
  })
};

const server = {
  deleteSong: defineAction({
    accept: "json",
    input: z.object({
      id: z.number()
    }),
    handler: async ({ id }, context) => {
      const token = context.cookies.get("token")?.value;
      console.log("Action deleteSong - Token from cookie:", token ? "FOUND" : "MISSING");
      if (!token) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "No autorizado"
        });
      }
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Sesión inválida"
        });
      }
      try {
        const { error } = await supabase.from("songs").delete().eq("id", id);
        if (error) {
          console.error("Supabase delete error:", error);
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al eliminar en base de datos"
          });
        }
        return { success: true };
      } catch (e) {
        if (e instanceof ActionError) throw e;
        console.error("Exception deleting song:", e);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error interno del servidor"
        });
      }
    }
  }),
  register: defineAction({
    accept: "json",
    input: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      phoneNumber: z.string().optional()
    }),
    handler: async ({ email, password, name, phoneNumber }) => {
      try {
        const response = await register(name, email, password, phoneNumber);
        if (!response?.ok) {
          let message = "Error al registrar usuario";
          try {
            const err = await response.json();
            message = err.error || message;
          } catch (e) {
          }
          throw new ActionError({
            code: "BAD_REQUEST",
            message
          });
        }
        return { success: true, message: "Usuario registrado correctamente" };
      } catch (error) {
        if (error instanceof ActionError) throw error;
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al registrar usuario"
        });
      }
    }
  }),
  login: defineAction({
    accept: "json",
    input: z.object({
      email: z.string().email(),
      password: z.string().min(1)
    }),
    handler: async ({ email, password }, context) => {
      try {
        const response = await login(email, password);
        if (response && response.ok) {
          const setCookie = response.headers.get("set-cookie");
          console.log("Action login - response set-cookie header:", setCookie);
          if (setCookie) {
            const match = setCookie.match(/token=([^;]+)/);
            const token = match ? match[1] : null;
            if (token) {
              context.cookies.set("token", token, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "lax"
              });
              return { success: true };
            }
          } else {
            const responseClone = response.clone();
            try {
              const responseBody = await responseClone.json();
              if (responseBody.token) {
                console.log("Action login - Token found in body, setting cookie");
                context.cookies.set("token", responseBody.token, {
                  path: "/",
                  httpOnly: true,
                  secure: true,
                  sameSite: "lax"
                });
                return { success: true };
              }
            } catch (e) {
            }
          }
          throw new ActionError({
            code: "UNAUTHORIZED",
            message: "Error: No se recibió el token de autenticación."
          });
        } else {
          throw new ActionError({
            code: "UNAUTHORIZED",
            message: "Credenciales incorrectas"
          });
        }
      } catch (error) {
        if (error instanceof ActionError) {
          throw error;
        }
        console.error(error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error interno del servidor"
        });
      }
    }
  }),
  createMisa: defineAction({
    accept: "json",
    input: z.object({
      title: z.string().min(1),
      dateMisa: z.string(),
      visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC")
    }),
    handler: async ({ title, dateMisa, visibility }, context) => {
      const token = context.cookies.get("token")?.value;
      if (!token) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "No autorizado"
        });
      }
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      if (authError || !user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Sesión inválida"
        });
      }
      try {
        const { data, error } = await supabase.from("misas").insert({
          title,
          date: dateMisa,
          // Assuming the DB column is 'date'
          visibility,
          id_user: user.id
        }).select().single();
        if (error) {
          console.error("Supabase insert error:", error);
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Error al crear la misa en base de datos"
          });
        }
        return { success: true, data };
      } catch (e) {
        if (e instanceof ActionError) throw e;
        console.error("Exception creating misa:", e);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error interno del servidor"
        });
      }
    }
  })
};

export { server };
