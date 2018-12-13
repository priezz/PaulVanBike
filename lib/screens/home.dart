import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:paulvanbike/widgets/list.dart';


class Home extends StatelessWidget {
    @override
    Widget build(BuildContext context) => Scaffold(
        body: FutureBuilder(
            future: rootBundle.loadString('assets/data/data.json'),
            builder: (context, snapshot) {
                final data = json.decode(snapshot.data.toString());
                if (data == null) return Text('');
                return SafeArea(child: Column(children: [
                    Container(
                        child: Image.asset('assets/logo.png', height: 100),
                        padding: EdgeInsets.only(top: 5, bottom: 35),
                    ),
                    Container(
                        child: Text(data['desc'], textAlign: TextAlign.center),
                        padding: EdgeInsets.only(left: 25, right: 25),
                    ),
                    List(data['items']),
                ]));
            },
        ),
    );
}
