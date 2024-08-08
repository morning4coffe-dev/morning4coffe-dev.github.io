export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.esNWkx9x.js","app":"_app/immutable/entry/app.CP9Aw6pc.js","imports":["_app/immutable/entry/start.esNWkx9x.js","_app/immutable/chunks/entry.t3-sm-pw.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/entry/app.CP9Aw6pc.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.DkBX_zpY.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
