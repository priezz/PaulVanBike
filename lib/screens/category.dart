import 'package:flutter/material.dart';

import 'package:paulvanbike/util/routines.dart';
import 'package:paulvanbike/widgets/list.dart';


class Category extends StatelessWidget {
    final dynamic category;
    Category(this.category);

    @override
    Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
            elevation: 0,
            title: Text(category['title']),
        ),
        body: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
                category['image'] != null || category['desc'] != null
                    ? Container(
                        child: Text(
                            category['desc'] ?? '',
                            style: TextStyle(color: Colors.white),
                            textAlign: TextAlign.center,
                        ),
                        decoration: BoxDecoration(
                            image: DecorationImage(
                                image: AssetImage('assets/images/${category['image']}'),
                                colorFilter: ColorFilter.mode(Colors.black38, BlendMode.darken),
                                fit: BoxFit.cover,
                            ),
                        ),
                        height: 100,
                        padding: EdgeInsets.fromLTRB(20, 5, 20, 5),
                        alignment: Alignment(0, 0),
                    )
                    : null,
                List(category['items']),
            ].where(notNull).toList(),
        ),
    );
}
