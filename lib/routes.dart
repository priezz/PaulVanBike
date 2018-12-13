import 'package:flutter/material.dart';
import 'package:navigate/navigate.dart';

import 'package:paulvanbike/screens/category.dart';
import 'package:paulvanbike/screens/item.dart';

Map<String, Handler> routes = {
    '/category' : Handler(pageBuilder: (BuildContext context, arg) => Category(arg['category'])),
    '/item' : Handler(pageBuilder: (BuildContext context, arg) => Item(arg['item'])),
};
