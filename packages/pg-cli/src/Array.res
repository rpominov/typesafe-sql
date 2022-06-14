include Belt.Array

@send external flatMap: (array<'a>, 'a => array<'b>) => array<'b> = "flatMap"
