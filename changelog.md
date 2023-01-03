# Changelog

# 0.4.6

Changed: (Crud) possibility to exclude some files from generation
Changed: (Autocrud) now can only run generated files (before can run not generated files)
Changed: (Autocrud) now works by running only generated files (i.e. files excluded from generation don't need to be excluded from autocrud)
Changed: (objects.ts) Objects no longer exports everything from within models. This will avoid growing the object file too much when changing to export variables named in model indexes.

# 0.4.5

Changed: Object field scalar array as pothos array #12
Changed: Distinct at queries is always uppercase #11


# Changelog

# 0.4.4

Changed: Now writing files is asynchronous

# Changelog

# 0.4.3

Changed: Now TS compiler uses `"newLine": "lf"`