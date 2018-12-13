library paulvanbike;

import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
import 'package:navigate/navigate.dart';

import 'package:paulvanbike/screens/home.dart';
import 'package:paulvanbike/routes.dart';
import 'package:paulvanbike/widgets/statusbar.dart';

void main() => runApp(App());

class App extends StatelessWidget {
    App() {
        Navigate.registerRoutes(routes: routes, defualtTransactionType: TransactionType.fromRight);
    }

    @override
    Widget build(BuildContext context) => MaterialApp(
        title: 'Paul van Bike',
        theme: ThemeData(
            accentColor: Colors.white70,
            canvasColor: Colors.grey[200],
            primarySwatch: Colors.grey,
            primaryColor: Colors.grey[200],
        ),
        home: Stack(children: [
            Home(),
            StatusBar('dark'),
        ]),
    );
}
