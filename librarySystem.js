(function () {
		var libraryStorage = {};

		function librarySystem(libraryName, dependency, callback) {
			if (arguments.length > 1) {
				libraryStorage[libraryName] = {
					callback: callback,
					dependency: dependency,
					cachedLibrary: null
				};
			} else {
				return loadLibrary(libraryName);
			}
		}

		// Internal Helper functionss:

		/*
		 *Recursively goes through and loads all dependencies required by the library (libraryName). 
		 *If a dependency was previously loaded, function will return the cached dependency (cachedLibrary) instead of loading dependency again.
		*/
		function loadLibrary(libraryName) {
			var library = libraryStorage[libraryName];

			if (library.cachedLibrary === null) {
				var libraryDependencies = library.dependency.map(function (dependency) {
					return librarySystem(dependency);
				});
				library.cachedLibrary = library.callback.apply(this, libraryDependencies);
			}
			return library.cachedLibrary;
		}

		// Expose libraries to Global Window.
		window.librarySystem = librarySystem;

	}());
